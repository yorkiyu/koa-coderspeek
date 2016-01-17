module.exports = function(grunt){
	grunt.initConfig({
		/**
			step 1:
			将入口文件拷贝到产出目录
		**/
		copy: {
			daniel: { 
				files: {
					"public/dist/daniel/person.min.js": ["public/src/js/daniel/person.js"]	
				}	
			}	
		},
		/**
			step 2:
			创建临时目录
			将需要合并的js文件转为具名函数，并保持独立的保存在一个临时目录里
		**/
		transport: {
			daniel: {
				options: {
					//生成具名函数的id格式
					idleading: '/'
				},
				files: [{
					'expand': true,
					//相对路径地址
					'cwd': 'public',
					//需要生成具名函数的文件集合
					'src': [
						'dist/daniel/person.min.js',
						'lib/bootstrap/3.3.6/js/bootstrap.js'
					],
					//生成存放的文件目录，里面的目录结构与src里面的文件名带有的目录结构一致
					'dest': 'public/dist/daniel/.build'
				}]
			}	
		},
		/***
			step 3:
			将临时目录下独立的具名函数文件，合并未1个js文件
			将这个合并的js文件拷贝到我们的输出目录
		***/
		concat: {
			daniel: {
				options: {
					//是否采用相对地址
					relative: true
				},
				files: {
					//合并后的文件地址
					'public/dist/daniel/person.js': [
						'public/dist/daniel/.build/dist/daniel/person.min.js',
						'public/dist/daniel/.build/lib/bootstrap/3.3.6/js/bootstrap.js',
						'public/lib/jquery/2.2.0/jquery.js'
					] 
				}
			}	
		},
		/***
		step 4:
		压缩合并后的文件
		***/
		uglify: {
			daniel: {
				files: {
					'public/dist/daniel/person.min.js': ['public/dist/daniel/person.js']	
				}	
			}	
		},

		/**
			删除临时文件.build
		**/
		clean: {
		   build: [
				'public/dist/daniel/.build' 
		   ]
		}
	});
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-cmd-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('build',['copy','transport','concat','uglify']);
}
