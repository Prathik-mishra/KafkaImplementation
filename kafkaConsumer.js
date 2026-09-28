const { Kafka } = require('./kafkaClient.js');

async function init(){

    try{
        const consumer = Kafka.consumer({ groupId: 'test-group' });

        console.log("Connecting kafka consumer...");
        await consumer.connect();
        await consumer.subscribe({
            topic : "crm-metaData",
            fromBeginning : true
        })
        console.log("Connected kafka consumer and subscribed topic successfully");

        await consumer.run(
            {
                eachMessage: async (
                    {
                    topic, 
                    partition, 
                    message
                    }
                ) => {
                    console.log(
                        {
                            value : message.value.toString(),
                        }
                    )
                },
            }
        )

    }catch(err){
        console.error("Error occured while connecting consumer: ", err);
    }
}


init();

