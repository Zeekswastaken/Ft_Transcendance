// export class UserDtosingin {
//     email:String;
//     password:String;
//     image:String;
//     constructor(){
//         this.image='none';
//     }
// }
export class UserDto {
    // id: number;
    username: string;
    birthday: Date;
    email: string;
    gender: string;
    password: string;
    confirmpassword: string;
    avatar_URL: string;
  
    constructor() {
      this.avatar_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU';
      this.confirmpassword = 'none';
      this.password = 'Oauth';
      this.gender = 'Gender';
      //this.birthday = new Date('25/07/2023');
    }
}
export class jwtDTO{
    username:String;
    email:String;
}
// export class UserDtosave {
//     username:String;
//     email:String;
//     password:String;
//     image:String;
//     constructor(){
//         this.image='none';
//     }
// }
// export class UserOauth{
//     username:String;
//     password:String;
//     email:String;
//     image:String;
//     constructor(){
//         this.image='none';
//         this.password='Oauth';
//     }
// }