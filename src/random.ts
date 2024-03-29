/** @module */
import uuidV1 from 'uuid/v1'
/**
 * 随机数工具类
 */
export default class RandomUtil {
  /**
   * 生成一个指定范围内的随机整数 [start, end)
   * @param start {number} start
   * @param end {number} end
   * @returns {number}
   */
  static getRandomInt (start: number, end: number): number {
    const c = end - start
    return Math.floor(Math.random() * c + start)
  }

  /**
   * 从列表中随机取出一个
   * @param list {array} 目标列表
   * @returns {*}
   */
  static getRandomFromList (list: any[]): any {
    return list[Math.floor(Math.random() * 1E4) % list.length]
  }

  /**
   * 生成一个指定范围内的随机小数 [start, end)
   * @param start {number} start
   * @param end {number} end
   * @param num {number} 保留几个小数点
   * @returns {string | *}
   */
  static getRandomFloat (start: number, end: number, num: number): string {
    let c = end - start
    return (Math.random() * c + start).toFixed(num)
  }

  /**
   * 生成一个随机小数, 范围 [0, 1)
   * @returns {number}
   */
  static getRandomDecimal (): number {
    return Math.random()
  }

  /**
   * 生成一个唯一id(v1版本)
   * @returns {*}
   */
  static getUniqueId (): string {
    return uuidV1()
  }

  /**
   * 从某字符串中随机选择字符
   * @param str {string}
   * @returns {*}
   */
  static getRandomChar (str: string): string {
    const index = RandomUtil.getRandomInt(0, str.length)
    return str[index]
  }

  /**
   * 生成随机字符串
   * @param length {number} 长度
   * @param chars {string} 从哪里选
   * @returns {string}
   */
  static getRandomString (length: number, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += RandomUtil.getRandomChar(chars)
    }
    return result
  }

  static uniqueNonce (): string {
    const randomBytes = require('randombytes')
    const ByteBuffer = require('bytebuffer')
    const Long = ByteBuffer.Long
    const b = new Uint8Array(randomBytes(2))
    let unique_nonce_entropy = parseInt((b[0] << 8 | b[1]).toString(), 10)
    let long = Long.fromNumber(Date.now())
    let entropy = ++unique_nonce_entropy % 0xFFFF
    long = long.shiftLeft(16).or(Long.fromNumber(entropy))
    return long.toString()
  }

  static getRandomFromWeightArray (arr: [any, number][]): any {
    let weightSum = 0
    for (let [ _, weight ] of arr) {
      weightSum += weight
    }
    const random = RandomUtil.getRandomInt(1, weightSum + 1)
    let temp = 0
    for (let [ value, weight ] of arr) {
      temp += weight
      if (random <= temp) {
        return value
      }
    }
    throw new Error(`权重随机错误`)
  }
}
