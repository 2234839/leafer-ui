import { IObject, IFunction } from '@leafer/interface'

import { IUIInputData } from '../IUI'


export type IKeyframe = IUIInputData | IAnimateKeyframe

export type IKeyframeId = number

export type IAnimateEasing =
    | IAnimateEasingName
    | number[] // cubic-bezier(number, number, number, number)

export type IAnimateEasingName =
    | 'linear'
    | 'ease'
    | 'ease-in' | 'ease-out' | 'ease-in-out'
    | 'sine-in' | 'sine-out' | 'sine-in-out'
    | 'quad-in' | 'quad-out' | 'quad-in-out'
    | 'cubic-in' | 'cubic-out' | 'cubic-in-out'
    | 'quart-in' | 'quart-out' | 'quart-in-out'
    | 'quint-in' | 'quint-out' | 'quint-in-out'
    | 'expo-in' | 'expo-out' | 'expo-in-out'
    | 'circ-in' | 'circ-out' | 'circ-in-out'
    | 'back-in' | 'back-out' | 'back-in-out'
    | 'elastic-in' | 'elastic-out' | 'elastic-in-out'
    | 'bounce-in' | 'bounce-out' | 'bounce-in-out'


export type IAnimateDirection = 'normal' | 'alternate' | 'reverse' | 'alternate-reverse'
export type IAnimateEnding = 'normal' | 'from' | 'to'

export interface IAnimateEasingFunction {
    (t: number): number
}


export interface IAnimateKeyframe {
    style: IUIInputData

    easing?: IAnimateEasing
    delay?: number
    duration?: number

    autoDelay?: number
    autoDuration?: number
}

export interface IComputedKeyframe {
    style: IUIInputData
    beforeStyle: IUIInputData
    betweenStyle?: IUIInputData

    easingFn?: IFunction

    delay?: number
    duration?: number

    autoDelay?: number
    autoDuration?: number

    totalDuration?: number // 存在delay 时， 才会有这个属性
}


export type IAnimation = IStyleAnimation | IKeyframesAnimation

export interface IKeyframesAnimation extends IAnimateOptions {
    keyframes: IKeyframe[]
}

export interface IStyleAnimation extends IAnimateOptions {
    style: IUIInputData
}

export interface IAnimateOptions {
    easing?: IAnimateEasing
    direction?: IAnimateDirection

    delay?: number
    duration?: number
    ending?: IAnimateEnding

    loop?: boolean | number
    loopDelay?: number

    speed?: number

    join?: boolean
    autoplay?: boolean

    attrs?: string[]
    event?: IAnimateEvents
}

export interface IAnimateEvents {
    play?: IAnimateEventFunction
    pause?: IAnimateEventFunction
    stop?: IAnimateEventFunction

    create?: IAnimateEventFunction
    update?: IAnimateEventFunction
    complete?: IAnimateEventFunction
}

export interface IAnimateEventFunction {
    (animate?: IAnimate): any
}

export interface IAnimate extends IAnimateOptions {
    target: IObject

    keyframes: IKeyframe[]
    config?: IAnimateOptions

    readonly frames: IComputedKeyframe[]
    readonly fromStyle: IObject
    readonly toStyle: IObject
    readonly endingStyle: IObject

    readonly started: boolean
    readonly running: boolean
    readonly completed: boolean
    readonly destroyed: boolean

    readonly time: number
    readonly looped: number

    readonly alternate: boolean
    readonly realEnding: IAnimateEnding

    init(): void

    play(): void
    pause(): void
    stop(): void
    seek(time: number): void
    kill(): void

    destroy(complete?: boolean): void
}