const amqplib = require('amqplib');

const amqplib_url_cloud = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';
const amqplib_url_docker = '';

const receiveNoti = async ()=>{
    try {
        //create conn
        const conn = await amqplib.connect(amqplib_url_cloud);

        const chanel = await conn.createChannel();

        const exchangeName = 'x1';

        await chanel.assertExchange(exchangeName, 'fanout',{
            durable: false
        });
        //fanout: ai muon nhan thi nhan

        //create queue
        const {
            queue //name queue
        } = await chanel.assertQueue('',{
            exclusive: true
        });

        console.log(`name queue: ${queue}`);

        //binding
        await chanel.bindQueue(queue, exchangeName, '');

        await chanel.consume(queue, msg =>{
            console.log(`messeage: ${msg.content.toString()}`);
        },{
            noAck: true
        })



    } catch (error) {
        console.log(error);
    }
};