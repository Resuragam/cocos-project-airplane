import { _decorator, BoxCollider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../frameWork/Constant';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    onEnable() {
        const collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    protected onDisable(): void {
        const collider = this.node.getComponent(BoxCollider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update(deltaTime: number) {}

    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();
        if (collisionGroup === Constant.CollistionType.ENEMY_PLANE || collisionGroup === Constant.CollistionType.ENEMY_BULLET) {
            console.log('reduce blood');
        }
    }
}
