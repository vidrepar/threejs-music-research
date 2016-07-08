
var app = {

    /*
    * core components
    * of any 3D environment
    * */

    scene   : null,
    camera  : null,
    renderer: null,

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
    drawParticles:function () {

        var PI2 = Math.PI*2;

        var material = new THREE.SpriteCanvasMaterial({
            color: 0x000000,
            program: function (context) {
                context.beginPath();
                context.arc(0,0,1,0,PI2,true);
                context.fill();

            }
        });

        for (var i = 0; i < app.PARTICLE_NUM; i++) {

            /*
             * Sprite() is just a holder
             * */
            var particle = new THREE.Sprite(material);
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar(Math.random()*10+450);
            app.scene.add(particle);

        }

    },
    render:function () {

        app.renderer.render(app.scene, app.camera);

    },
    animate:function () {

        requestAnimationFrame(app.animate);

        /*
        * Animate stuff
        * */
        app.render();

    }

};

app.init();
app.drawParticles();
app.animate();