const { Kafka } = require('./kafkaClient.js');


async function init(){
  const admin = Kafka.admin();
  console.log("admin connecting....");
  await admin.connect();
  console.log("admin connected ....");

  //adding Temp code to delete the topics which were previously created:
  try{
    await admin.deleteTopics({
      topics: ['crm-metaData'],
      timeout: 5000,
    });
    console.log('Topic deleted successfully');
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

  await admin.disconnect();
  console.log("admin disconnected....");
}

init();