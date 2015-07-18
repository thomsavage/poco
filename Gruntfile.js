/**
 * Poco Gruntfile.js
 */
module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-msbuild');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
	
	
	var JenkinsBuildId = process.env.BUILD_ID || "Local Development Build";
	
	process.env.MSBUILDDISABLENODEREUSE = 1;
	
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		msbuild: {
			options: {
				version: 12.0,
				maxCpuCount: 4,
				buildParameters: {
					WarningLevel: 2
				},
				verbosity: 'minimal'
			},
			release_static_mt: {
				src: [
                    'Foundation/Foundation_vs120.vcxproj',
                    'Net/Net_vs120.vcxproj',
                    'Util/Util_vs120.vcxproj'
                ],
				options: {
					projectConfiguration: 'release_static_mt',
					targets: ['Build']
				}
			},
            debug_static_mt: {
				src: [
                    'Foundation/Foundation_vs120.vcxproj',
                    'Net/Net_vs120.vcxproj',
                    'Util/Util_vs120.vcxproj'
                ],
				options: {
					projectConfiguration: 'debug_static_mt',
					targets: ['Build']
				}
			},
            clean: {
				src: [
                    'Foundation/Foundation_vs120.vcxproj',
                    'Net/Net_vs120.vcxproj',
                    'Util/Util_vs120.vcxproj'
                ],
				options: {
					projectConfiguration: 'release_static_mt',
					targets: ['Clean']
				}
			}
		},
        copy: {
			"build-artifacts": {
				files: [
					{expand: true, src: ['lib/*'], dest: 'build-artifacts/'},
                    {expand:true, cwd: 'Foundation', src: ['include/**/*'], dest: 'build-artifacts/'},
                    {expand:true, cwd: 'Net', src: ['include/**/*'], dest: 'build-artifacts/' },
                    {expand:true, cwd: 'Util', src: ['include/**/*'], dest: 'build-artifacts/'}
				]
            }
        },
        clean: [ "build-artifacts" ]
    });
	
    grunt.registerTask('jenkins',
		"Builds production build artifacts for Tanium IOC Detect",
		[
			'msbuild:release_static_mt',
			'msbuild:debug_static_mt',
            'copy:build-artifacts'
		]
	);
    
    grunt.registerTask('clean-all',
        "Removes all build artifacts",
        [
            "msbuild:clean",
            "clean"
        ]
    )
};
