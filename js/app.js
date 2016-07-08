
var app = {

    /*
    * core components
    * of any 3D environment
    * */

    scene   : null,
    camera  : null,
    renderer: null,

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

    }

};

app.init();