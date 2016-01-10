/*
* config
*/

module.exports = {
	// debug 为 true 时，用于本地调试
	debug: true,
	port: 3000,
	// 社区的域名
	host: 'localhost',
	name: 'Coderspeek', //社区名字
	description: '',
	keywords: '',
	
	// mongodb 配置
	db: 'mongodb://127.0.0.1/node_club_dev',

	// redis 配置，默认是本地
	redis_host: '127.0.0.1',
	redis_port: 6379,
	redis_db: 0,
	
	//日志
	logfile: 'logs/cheese.log'
}
