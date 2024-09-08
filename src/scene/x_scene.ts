import { MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer, Mesh, BoxGeometry, Vector3, AxesHelper } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats  from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';


export class XScene{

    private static instance=new XScene();
    private camera: PerspectiveCamera
    private renderer=new WebGLRenderer;
    private readonly scene:Scene;
    private cube: Mesh;
    private cp:Vector3;
    private stats:Stats;
    

    private constructor(){
        this.camera=new PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 1000);
        this.cp=new Vector3(0,0,2);
        this.camera.position.setZ(this.cp.z);
        this.scene=new Scene();
        this.scene.add(new AxesHelper(5))
        this.renderer=new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        new OrbitControls(this.camera, this.renderer.domElement);
        const geometry=new BoxGeometry();
        const material=new MeshBasicMaterial( { color: 0x00ff00, wireframe:true })
        this.cube=new Mesh(geometry, material)
        this.scene.add(this.cube);
        window.addEventListener('resize', this.onWindowResize, false);
        this.stats= new Stats();
        document.body.appendChild(this.stats.dom);

        const gui=new GUI();
        const cubeFolder=gui.addFolder('Cube');
        const cubeRotationFolder = cubeFolder.addFolder('Rotation');
        cubeRotationFolder.add(this.cube.rotation, 'x', 0, Math.PI*2.0);
        cubeRotationFolder.add(this.cube.rotation, 'y', 0, Math.PI*2);
        cubeRotationFolder.add(this.cube.rotation, 'z', 0, Math.PI*2);
        cubeFolder.open();
        cubeRotationFolder.open();
        const cubePositionFolder=cubeFolder.addFolder('Position');
        cubePositionFolder.add(this.cube.position, 'x', -10, 10, 2);
        cubePositionFolder.add(this.cube.position, 'y', -10, 10, 2);
        cubePositionFolder.add(this.cube.position, 'z', -10, 10, 2);
        cubeFolder.open();
        cubePositionFolder.open();
        const cubeScaleFolder=cubeFolder.addFolder('Scale');
        cubeScaleFolder.add(this.cube.scale,'x', -5, 5);
        cubeScaleFolder.add(this.cube.scale,'y', -5, 5);
        cubeScaleFolder.add(this.cube.scale,'z', -5, 5);
        cubeFolder.add(this.cube, 'visible');
        cubeFolder.open();
    }

    public static getInstance(){
        return this.instance;
    }
    onWindowResize=()=>{
        this.camera.aspect=(window.innerWidth/window.innerHeight);
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
    animate=()=>{
        requestAnimationFrame(this.animate);
        this.cube.rotation.x +=0.01;
        this.cube.rotation.y +=0.01;
        this.render();
        this.stats.update();
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    
}