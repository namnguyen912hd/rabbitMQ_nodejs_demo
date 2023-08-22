const amqplib =  require("amqplib");

//.env
const amqplib_url_cloud = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';
const amqplib_url_docker = '';

const postVideo = async ({msg}) => {
    try {
        const conn = await amqplib.connect(amqplib_url_cloud);
        const chanel = await conn.createChannel();

        //create exchange   
        const exchangeName = "x1";
        await chanel.assertExchange(exchangeName,'fanout',{
            durable: false
        });

        //publish exchange for others comsumer 
        await chanel.publish(exchangeName, '', Buffer.from(msg))

        console.log(`send ok ${msg}`);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 2000);

    } catch (error) {
        console.log(error)
    }
};

const msg = process.argv.slice(2).join(' ') || 'nam nguyen';
postVideo({msg});

