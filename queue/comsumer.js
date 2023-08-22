const amqplib = require('amqplib');
 
//.env
const amqplib_url_cloud = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';
const amqplib_url_docker = 'amqps://localhost:5672';

const receive_queue = async () =>{
    try {
        //create connect 
        const conn = await amqplib.connect(amqplib_url_cloud);

        //create channel
        const channel = await conn.createChannel();

        //create queue
        const nameQueue = 'queue1';

        await channel.assertQueue(nameQueue,{
            durable: false
        });

        //receive to queue
        await channel.consume(nameQueue, msg =>{
            console.warn(msg.content.toString());
        },{
            //xac nhan da nhan data chua
            noAck: true
        }
        );

        //close connection

    } catch (error) {
        
    }
}

receive_queue();