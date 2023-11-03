import { SphereGeometry, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer, Mesh, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class XScene{

    private static instance=new XScene();
    private camera: PerspectiveCamera
    private renderer=new WebGLRenderer;
    private readonly scene:Scene;
    private geometry1: SphereGeometry;
    private geometry2: SphereGeometry;
    private material: MeshBasicMaterial;
    private sphere: Mesh
    private child: Mesh
    private object: Object3D

    private constructor(){
        this.camera=new PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 1000);
        this.camera.position.z=100;
        this.scene=new Scene();
        this.renderer=new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize, false);
        new OrbitControls(this.camera, this.renderer.domElement);
        this.geometry1=new SphereGeometry(16,30,30);
        this.geometry2=new SphereGeometry(8,30,30);
        this.material=new MeshBasicMaterial({color: 0xff0000, wireframe: true})
        this.object=new Object3D();
        this.child=new Mesh(this.geometry2, this.material);
        this.child.position.set(20,20,20);
        this.object.add(this.child);
        this.sphere=new Mesh(this.geometry1, this.material);
        this.scene.add(this.sphere);
        this.scene.add(this.object);

    }
    public static getInstance(){
        return this.instance;
    }
    onWindowResize=()=>{
        this.camera.aspect=window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
    animate=()=>{
        requestAnimationFrame(this.animate)
        this.sphere.rotation.x+=0.01;
        this.child.rotation.y+=0.01;
        this.object.rotation.y-=-0.01;
        this.render();
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    
}