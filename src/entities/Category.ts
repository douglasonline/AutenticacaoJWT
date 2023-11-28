import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm"

@Entity('category')
export class Category{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', unique: true})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'timestamp', default: () => "now()"})
    created_at: Timestamp

}