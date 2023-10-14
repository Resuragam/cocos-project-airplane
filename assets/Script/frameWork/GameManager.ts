import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Bullet } from '../bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    @property(Prefab)
    public buttle01: Prefab = null;
    @property(Prefab)
    public buttle02: Prefab = null;
    @property(Prefab)
    public buttle03: Prefab = null;
    @property(Prefab)
    public buttle04: Prefab = null;
    @property(Prefab)
    public buttle05: Prefab = null;

    @property
    public bulletSpeed = 1;
    @property
    public shootTime = 0.3;

    @property(Node)
    public bulletRoot: Node = null;

    private _currShootTime = 0;
    private _isShooting = false;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._currShootTime = this._currShootTime + deltaTime;
        if (this._isShooting && this._currShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._currShootTime = 0;
        }
    }

    public createPlayerBullet() {
        const bullet = instantiate(this.buttle01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        console.log(pos);
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        console.log(bullet.position);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
    }

    public isShooting(val: boolean) {
        this._isShooting = val;
    }

    private _init() {
        this._currShootTime = this.shootTime;
    }
}
