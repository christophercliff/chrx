module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-watchify')

    var task = {
        options: {
            debug: true
        },
        background: {
            src: './src/background/index.js',
            dest: './extension/background.js'
        },
        content: {
            src: './src/content/index.js',
            dest: './extension/content.js'
        }
    }

    grunt.initConfig({
        manifest: grunt.file.readJSON('./extension/manifest.json'),
        browserify: task,
        watchify: task
    })

    grunt.registerTask('default', [
        'browserify:background',
        'browserify:content'
    ])

    grunt.registerTask('watch', [
        'watchify:background',
        'watchify:content'
    ])

}
