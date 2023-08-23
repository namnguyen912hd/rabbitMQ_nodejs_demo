const amqplib = require('amqplib')

//.env

const amqplib_url_clound = 'amqps://mlnifnyq:SVBvjGFcmNdVdQ-cFsNB78ViPFi_DVIU@armadillo.rmq.cloudamqp.com/mlnifnyq';

const sendEmail = async () => {
    try {
        //create connect
        const conn = await amqplib.connect(amqplib_url_clound);

        //createe channel
        const channel = await conn.createChannel();

        //create exchange
        const exchangeName = 's1';

        await channel.assertExchange(exchangeName,'topic',{
            durable: false
        });

        const args = process.argv.slice(2);
        const msg = args[1] || 'fixed';
        const topic = args[0];

        console.log(`msg: ${msg} -- topic: ${topic}`)

        await channel.publish(exchangeName, topic, Buffer.from(msg));

        console.log(`send ok ${msg}`);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 10000);

    } catch (error) {
        console.log(error);
    }
}

sendEmail();

// 1 hoat dong send email co the send bat ky comsumer muon nhan dc cai mail nay
// hoac send den 1 bo phan ngta dang ky

