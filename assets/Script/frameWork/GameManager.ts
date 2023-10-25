import { _decorator, Component, instantiate, Node, Prefab, math, Vec3, BoxCollider, Collider } from 'cc';
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

        this._currCreateEnemyTime = this._currCreateEnemyTime + deltaTime;
        if (this._combinationInterval === Constant.Combination.PLANE1) {
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        } else if (this._combinationInterval === Constant.Combination.PLANE2) {
            if (this._currCreateEnemyTime > this.createEnemyTime * 0.9) {
                const randomCombination = math.randomRangeInt(1, 3);
                if (randomCombination === Constant.Combination.PLANE2) {
                    this.createCombition1();
                } else {
                    this.createEnemyPlane();
                }

                this._currCreateEnemyTime = 0;
            }
        } else {
            if (this._currCreateEnemyTime > this.createEnemyTime * 0.8) {
                const randomCombination = math.randomRangeInt(1, 4);
                if (randomCombination === Constant.Combination.PLANE2) {
                    this.createCombition1();
                } else if (randomCombination === Constant.Combination.PLANE3) {
                    this.createCombition2();
                } else {
                    this.createEnemyPlane();
                }

                this._currCreateEnemyTime = 0;
            }
        }
    }

    public addScore() {}

    public createPlayerBullet() {
        const bullet = instantiate(this.buttle01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
    }

    public createEnemyBullet(targetPos: Vec3) {
        const bullet = instantiate(this.buttle01);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(1, true);

        const colliderComp = bullet.getComponent(BoxCollider);
        colliderComp.setGroup(Constant.CollistionType.ENEMY_BULLET);
        colliderComp.setMask(Constant.CollistionType.SELF_PLANE);
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
        enemyComp.show(this, speed, true);

        const randomPos = math.randomRange(-23, 22);
        enemy.setPosition(randomPos, 0, -150);
    }

    public createCombition1() {
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            element.parent = this.node;
            element.setPosition(-20 + i * 10, 0, -150);
            const emenyComp = element.getComponent(EnemyPlane);
            emenyComp.show(this, this.enemy1Speed, false);
        }
    }

    public createCombition2() {
        const enemyArray = new Array<Node>(7);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy02);
            const element = enemyArray[i];
            element.parent = this.node;
            if (i < 4) {
                element.setPosition(-20 + i * 7, 0, -150 + i * 5);
            } else {
                element.setPosition(-20 + i * 7, 0, -135 - (i - 3) * 5);
            }
            const emenyComp = element.getComponent(EnemyPlane);
            emenyComp.show(this, this.enemy2Speed, false);
        }
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
