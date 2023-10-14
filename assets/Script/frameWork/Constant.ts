import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constant')
export class Constant extends Component {
    public static EnemyType = {
        TYPE1: 1,
        TYPE2: 2,
    };

    public static Combination = {
        PLANE1: 1,
        PLANE2: 2,
        PLANE3: 3,
    };
    start() {}

    update(deltaTime: number) {}
}
