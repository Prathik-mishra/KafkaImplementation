const { Kafka } = require('./kafkaClient.js');

async function init(){
    const producer = Kafka.producer();
    console.log("producer connecting....");
    await producer.connect();
    console.log("producer connected ....");

    try{
        await producer.send({
            topic: 'crm-metaData',
            messages: [
                { partition: 0, key : 'trigger', value : JSON.stringify({name : 'CasesTrigger', FilterConditon : 'some XML'})},
                { partition: 0, key : 'trigger', value : JSON.stringify({name : 'LeadsTrigger', FilterConditon : 'some XML'})},
            ],
        });
    }
    catch(err){
        console.error("Error occurred while sending message:", err);
    }
    
    await producer.disconnect();
    console.log("producer disconnected....");
}

init();