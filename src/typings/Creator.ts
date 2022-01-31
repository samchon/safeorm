/**
 * Creator type of a class.
 * 
 * @template T The target class type.
 * @author Jeongho Nam - https://github.com/samchon
 */
 export type Creator<T extends object> = 
 {
     new(...args: any[]): T;
 };
 
 export namespace Creator
 {
     export type Getter<T extends object> = () => Creator<T>;
 }