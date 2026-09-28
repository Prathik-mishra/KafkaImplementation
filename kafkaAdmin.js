const { Kafka } = require('./kafkaClient.js');


async function init(){
  const admin = Kafka.admin();
  console.log("admin connecting....");
  await admin.connect();
  console.log("admin connected ....");

  //adding Temp code to delete the topics which were previously created:
  try{
    const topics = await admin.listTopics();
    const kafkaTopicSize = topics.length;
    if(kafkaTopicSize >= 1){
      await admin.deleteTopics({
      topics: ['crm-metaData'],
      timeout: 5000,
    });
      console.log('Topic deleted successfully');
    }else{
      console.log('No Topic present to be deleted');
    }

  }catch(err){
    console.error('Error deleting topic:', err.message);
  }


  try{
    const createdTopics = await admin.createTopics({
      topics: [
        {
          topic: 'crm-metaData',
          numPartitions: 2,
          partitioner: 'roundrobin',
        },
      ],
    });

    console.log(createdTopics ? 'Topic created' : 'Topic already exists');
  }catch(err){
    console.error('Error creating topic:', err.message);
  }

  //get the list of topics added into kafka by admin at startup:
  try{
    console.log("fetching local topics of kafka on start-up");
    console.log(await admin.listTopics());
  }catch(err){
    console.log("Issue while getting local topics list" +err);
  }

  await admin.disconnect();
  console.log("admin disconnected....");
}

init();