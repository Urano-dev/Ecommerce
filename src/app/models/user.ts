export class User {
    city: string
    country: string
    dateBirth: Date
    dni: string
    email: string
    firstname: string
    homeAdress: string
    lastname: string
    password: string
    state: string
    telephone: string
    terms: boolean
    username: string
    zipCode: string

    constructor(city: string,
        country: string,
        dateBirth: Date,
        dni: string,
        email: string,
        firstname: string,
        homeAdress: string,
        lastname: string,
        password: string,
        state: string,
        telephone: string,
        terms: boolean,
        username: string,
        zipCode: string) {
        this.city= city;
        this.country= country;
        this.dateBirth =dateBirth;
        this.dni=dni;
        this.email=email
        this.firstname=firstname
        this.homeAdress=homeAdress
        this.lastname=lastname
        this.password=password
        this.state=state
        this.telephone=telephone
        this.terms= terms
        this.username=username
        this.zipCode=zipCode
    }
}