const amqplib = require('amqplib');
 
//.env
const amqplib_url_cloud = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';
const amqplib_url_docker = 'amqps://localhost:5672';

const send_queue = async ({msg}) =>{
    try {
        //create connect 
        const conn = await amqplib.connect(amqplib_url_cloud);

        //create channel
        const channel = await conn.createChannel();

        //create queue
        const nameQueue = 'queue1';

        await channel.assertQueue(nameQueue,{
            durable: true // server bi restart/die thi queue ko bi mat
        });

        //send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg),{
            persistent: true // duoc luu vao cache or disk --> cache chet thi lay ra tu disk
        });

        // await channel.sendToQueue(nameQueue, Buffer.from(msg),{
        //     expiration: "10000" //time to live
        // });

        //close connection

    } catch (error) {
        console.log(error);
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