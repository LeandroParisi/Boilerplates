import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "template"
})
export class Template {
    @Column()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    filename: string

    @Column()
    views: number

    @Column()
    isPublished: boolean
}
