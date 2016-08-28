setTimeout(function(){console.log("Hello World");},1000);



process.version           //Node的版本字符串信息
process.argv              //"node"命令行的數組參數，argv[0]是‘node’;
process.env               //环境变量对象，例如process.env.PATH
process.pid              // 进程id
process.getuid()         //返回用户id
process.cwd()            //返回当前的工作目录
process.chdir()          //改变目录
process.exit()            //退出(运行shutdown命令之后)




