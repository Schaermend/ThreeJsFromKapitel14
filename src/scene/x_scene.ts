import { PerspectiveCamera, Scene, WebGLRenderer, Mesh, AxesHelper, PointLight, MeshPhongMaterial, SphereGeometry, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from "dat.gui";


export class XScene{

    private static instance=new XScene();
    private camera: PerspectiveCamera;
    private renderer=new WebGLRenderer;
    private readonly scene:Scene;
    private object1: Mesh;
    private object2: Mesh;
    private object3: Mesh;
    private controls:OrbitControls;
    private stats: Stats;
    private debug: HTMLDivElement;
    

    private constructor(){
        this.camera=new PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 1000);
        this.camera.position.setY(4);
        this.camera.position.setY(4);
        this.camera.position.setZ(4);
        this.scene=new Scene();
        this.renderer=new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.controls=new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(8,0,0);
        const light=new PointLight(0xffffff, 400);
        light.position.set(10, 10, 10)
        this.scene.add(light)
        this.object1=new Mesh(new SphereGeometry(), new MeshPhongMaterial({color: 0xff0000}));
        this.object1.position.set(4,0,0);
        this.scene.add(this.object1);
        this.object1.add (new AxesHelper(5));
        this.object2=new Mesh(new SphereGeometry(), new MeshPhongMaterial({color: 0x00ff00}));
        this.object2.position.set(4,0,0);
        this.object1.add(this.object2);
        this.object2.add (new AxesHelper(5));
        this.object3=new Mesh(new SphereGeometry(), new MeshPhongMaterial({color: 0x0000ff}));
        this.object3.position.set(4,0,0);
        this.object2.add(this.object3);
        this.object3.add (new AxesHelper(5));
        window.addEventListener('resize', this.onWindowResize, false);
        const gui=new GUI();
        const object1Folder=gui.addFolder('Object1');
        object1Folder.add(this.object1.position, 'x', 0, 10, 0.01).name('X-Position');
        object1Folder.add(this.object1.rotation, 'x', 0, Math.PI*2, 0.01).name('X-Rotation');
        object1Folder.add(this.object1.scale, 'x', 0, 2, 0.01).name('X-Scale');
        object1Folder.open();
        const object2Folder=gui.addFolder('Object2');
        object2Folder.add(this.object2.position, 'x', 0, 10, 0.01).name('X-Position');
        object2Folder.add(this.object2.rotation, 'x', 0, Math.PI*2, 0.01).name('X-Rotation');
        object2Folder.add(this.object2.scale, 'x', 0, 2, 0.01).name('X-Scale');
        object2Folder.open();
        const object3Folder=gui.addFolder('Object3');
        object3Folder.add(this.object3.position, 'x', 0, 10, 0.01).name('X-Position');
        object3Folder.add(this.object3.rotation, 'x', 0, Math.PI*2, 0.01).name('X-Rotation');
        object3Folder.add(this.object3.scale, 'x', 0, 2, 0.01).name('X-Scale');
        object3Folder.open();
        this.stats=new Stats();
        document.body.appendChild(this.stats.dom);
        this.debug=document.getElementById('debug1') as HTMLDivElement
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
        this.controls.update();
        this.render();
        const object1WorldPosition=new Vector3();
        this.object1.getWorldPosition(object1WorldPosition);
        const object2WorldPosition=new Vector3();
        this.object2.getWorldPosition(object2WorldPosition);
        const object3WorldPosition=new Vector3();
        this.object3.getWorldPosition(object3WorldPosition);
        this.debug.innerText=
        'Red\n'+
        'Local Pos X : '+
        this.object1.position.x.toFixed(2)+
        '\n'+
        'World Pos X : '+
        object1WorldPosition.x.toFixed(2)+
        '\n'+
        '\nGreen\n'+
        'Local Pos X : '+
        this.object2.position.x.toFixed(2)+
        '\n'+
        'World Pos X : '+
        object2WorldPosition.x.toFixed(2)+
        '\n'+
        '\nBlue\n'+
        'Local Pos X : '+
        this.object3.position.x.toFixed(2)+
        '\n'+
        'World Pos X : '+
        object3WorldPosition.x.toFixed(2)+
        '\n';
        this.stats.update();
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    
}