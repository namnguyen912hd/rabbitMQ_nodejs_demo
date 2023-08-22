const amqplib = require('amqplib');
 
//.env
const amqplib_url_cloud = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';
const amqplib_url_docker = '';

const send_queue = async ({msg}) =>{
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

        //send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg));

        //close connection

    } catch (error) {
        
    }
}

const msg = process.argv.slice(2).join(' ') || "Hello world";

//console.log(process.argv);
// process.argv = [
//     //bin.node
//     //path
//     // text
// ]




send_queue({msg});