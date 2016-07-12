
var app = {

    /*
    * core components
    * of any 3D environment
    * */
    scene   : null,
    camera  : null,
    renderer: null,

    // Audio
    sound:null,
    analyser:null,
    bufferLength:null,
    dataArray:null,

    // Visual
    sphere  : null,
    sphereGeometry : null,

    PARTICLE_NUM:100,

    init: function () {

        // Camera setup
        app.camera = new THREE.PerspectiveCamera(
            75,
            $(window).width()/$(window).height(),
            1,
            10000);

        app.camera.position.z = 100;

        // Scene setup
        app.scene = new THREE.Scene();

        // Renderer setup
        app.renderer = new THREE.CanvasRenderer();
        app.renderer.setPixelRatio(window.devicePixelRatio);
        app.renderer.setSize($(window).width(), $(window).height());
        app.renderer.setClearColorHex(0xffffff, 1);

        // Append to HTML

        var container = $('<div>');
        /*
        * domElement = element in which
        * all of the scene will be rendered
        * this is our canvas basically
        * and the renderer returns it
        * */
        container.append(app.renderer.domElement);
        $('body').append(container);


    },
    setupAudio:function () {

        // Audio setup
        app.sound = new Pizzicato.Sound({
            source: 'file',
            options: { path: 'assets/sound/song-4.mp3' }
        }, function() {

            console.log('sound file loaded!');
            app.sound.play();
            app.animate();

        });

        app.analyser = app.sound.getAnalyser();

        console.log(app.analyser);

        app.analyser.fftSize = 256;
        app.bufferLength = app.analyser.frequencyBinCount;
        console.log(app.bufferLength);
        app.dataArray = new Uint8Array(app.bufferLength);

    },
    drawSphere:function () {

        app.sphereGeometry = new THREE.SphereGeometry( 25, 10, 10 );
        var m = new THREE.MeshLambertMaterial( {color: 0x7777ff} );
        app.sphere = new THREE.Mesh( app.sphereGeometry, m );

        console.log(app.sphere.geometry.parameters.radius);

        console.log(app.sphere.rotation);
        console.log(app.sphere.position);
        console.log(app.sphere.up);
        console.log(app.sphere);

        var light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 50, 50, 50 );

        app.scene.add( app.sphere );
        app.scene.add( light );

    },
    render:function () {

        app.renderer.render(app.scene, app.camera);

    },
    animate:function () {

        requestAnimationFrame(app.animate);

        /*
        * Animate stuff
        * */

        // Audio based animation
        app.analyser.getByteFrequencyData(app.dataArray);
        //console.log(app.dataArray);

        elmt = app.dataArray;

        var sum = 0;
        for( var i = 0; i < elmt.length; i++ ){
            sum += parseInt( elmt[i], 10 ); //don't forget to add the base
        }

        var fttAvg = Math.floor(sum/elmt.length);

        /*TweenLite.to(app.sphere.rotation, 10, {
            x:10,
            y:1,
            z:1,
            ease: Quad.easeOut
        });*/

        /*TweenLite.to(app.sphere.position, 10, {
            x:10,
            y:10,
            z:-100
        });*/

        TweenLite.to(app.sphere.scale, 0.1, {
            x:2,
            y:2,
            z:2,
            ease: Quad.easeInOut
        });


        //app.camera.rotation.y += 0.01;



        if (fttAvg > 0 && fttAvg < 65) {




        } else if (fttAvg > 65 && fttAvg < 110) {



        } else if (fttAvg > 110) {



        }

        app.render();

    }

};

app.init();
app.drawSphere();
app.setupAudio();