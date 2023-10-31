import { SphereGeometry, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer, Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class XScene{

    private static instance=new XScene();
    private camera: PerspectiveCamera
    private renderer=new WebGLRenderer;
    private readonly scene:Scene;
    private geometry: SphereGeometry;
    private material: MeshBasicMaterial;
    private sphere: Mesh

    private constructor(){
        this.camera=new PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 1000);
        this.camera.position.z=100;
        this.scene=new Scene();
        this.renderer=new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize, false);
        new OrbitControls(this.camera, this.renderer.domElement);
        this.geometry=new SphereGeometry(16,30,30);
        this.material=new MeshBasicMaterial({color: 0xff0000, wireframe: true})
        this.sphere=new Mesh(this.geometry, this.material);
        this.scene.add(this.sphere);

    }
    public static getInstance(){
        return this.instance;
    }
    onWindowResize(){
        this.camera.aspect=window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
    animate=()=>{
        requestAnimationFrame(this.animate)
        this.sphere.rotation.x+=0.01;
        this.render();
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    
}