import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { Category } from "./Category";

@Entity('films')
export class Films{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', unique: true})
    name: string

    @Column({type: 'text'})
    description: string

    @ManyToOne(type => Category, { onDelete: "CASCADE", cascade: true })
    @JoinColumn({ name: 'category_id' })
    Category: Category;

    @Column({type: "numeric"})
    duration: number

    @Column({type: 'timestamp', default: () => "now()"})
    created_at: Timestamp

}