import { _decorator, Component, instantiate, Node, Prefab, math } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Constant } from './Constant';
import { EnemyPlane } from '../plane/EnemyPlane';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    // bullet
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

    // enemy
    @property(Prefab)
    public enemy01: Prefab = null;
    @property(Prefab)
    public enemy02: Prefab = null;
    @property
    public createEnemyTime = 1;
    @property
    public enemy1Speed = 0.5;
    @property
    public enemy2Speed = 0.7;

    private _currShootTime = 0;
    private _isShooting = false;

    private _currCreateEnemyTime = 0;
    private _combinationInterval = Constant.Combination.PLANE1;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._currShootTime = this._currShootTime + deltaTime;
        if (this._isShooting && this._currShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._currShootTime = 0;
        }

        if (this._combinationInterval === Constant.Combination.PLANE1) {
            this._currCreateEnemyTime = this._currCreateEnemyTime + deltaTime;
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        } else if (this._combinationInterval === Constant.Combination.PLANE2) {
        }
    }

    public createPlayerBullet() {
        const bullet = instantiate(this.buttle01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
    }

    public createEnemyPlane() {
        const whichEnemy = math.randomRangeInt(1, 3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;
        } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
        }

        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(speed);

        const randomPos = math.randomRange(-23, 22);
        enemy.setPosition(randomPos, 0, -150);
    }

    public isShooting(val: boolean) {
        this._isShooting = val;
    }

    private _init() {
        this._currShootTime = this.shootTime;
        this.changePlaneMode();
    }

    private changePlaneMode() {
        this.schedule(this._modeChanged, 10, 3);
    }

    private _modeChanged() {
        this._combinationInterval++;
    }
}
