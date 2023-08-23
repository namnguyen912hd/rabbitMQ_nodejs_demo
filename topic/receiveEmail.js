const amqplib = require('amqplib');

const amqplib_url_clound = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';

const receiveEmail = async () =>{
    try {
        
        //create connect
        const conn = await amqplib.connect(amqplib_url_clound);

        //create channel
        const channel = (await conn).createChannel();

        //create exchange
        const exchangeName = 's1';
        (await channel).assertExchange(exchangeName, 'topic',{
            durable: false
        })

        //create queue
        const {queue} = (await channel).assertQueue('',{
            exclusive: true
        });

        console.log(queue)

        //create binding
        const args = process.argv.slice(2);

        if(!args.length){          
            process.exit(0);
        }

        console.log(`create queue: ${queue} -- topic: ${args}`);

        args.forEach(async key =>{
            (await channel).bindQueue(queue, exchangeName, key);
        })

        // (await channel).bindQueue(queue, exchangeName, 'key');

        //publish email
        (await channel).consume(queue, msg =>{
            console.log(`routing key: ${msg.fields.routingKey.toString()} --- msg: ${msg.content.toString()}`);

        })
    } catch (error) {
        console.log(error);
    }
};

receiveEmail();

/**
 *   *: phu hop vs bat ky tu nao
 *   #: khớp vs 1 or nhiều từ bất kỳ
 */