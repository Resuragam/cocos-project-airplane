import { _decorator, BoxCollider, Component, ITriggerEvent, Node, sp } from 'cc';
import { Constant } from '../frameWork/Constant';
const { ccclass, property } = _decorator;

const OUTOFRANGE = -10;
@ccclass('Bullet')
export class Bullet extends Component {
    private _bulletSpeed = 0;

    private _isEnemyBullet = false;

    start() {}

    onEnable() {
        const collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    protected onDisable(): void {
        const collider = this.node.getComponent(BoxCollider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        let outOfRange = 50;
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed;
        } else {
            moveLength = pos.z - this._bulletSpeed;
        }
        this.node.setPosition(pos.x, pos.y, moveLength);

        if (moveLength < OUTOFRANGE && !this._isEnemyBullet) {
            this.node.destroy();
        } else if (moveLength > outOfRange) {
            this.node.destroy();
        }
    }

    show(speed: number, isEnemyBullet: boolean) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        this.node.destroy();
    }
}
