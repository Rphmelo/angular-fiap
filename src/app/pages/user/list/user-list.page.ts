import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.css']
})

export class UserListPage {

  filterBy: string = '';
  loading = true;
  orderBy: string = '';
  users = [];

  setFilterBy(event: any) {
    this.filterBy = event.target.value;
  }

  constructor(
    private usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(){
    this.usersService.list().subscribe(data => {
        this.users = [];
        for(let i = 0; i < data.length; i++) {
          this.users.push(data[i].payload.doc.data())
        }

        this.loading = false;   
      });
  }

  private deleteUser(id: string) {
    this.usersService.getById(id).subscribe((data: any) => {
      const { doc } = data[0].payload;

      this.usersService.delete(doc.id)
      .then(() => {
        this.loading = false

        this._snackBar.open("Usuário deletado com sucesso", "Ok", {
          duration: 2000,
        });
      })
      .catch(() => {
        this.loading = false

        this._snackBar.open("Ocorreu um erro ao deletar usuário", "Ok", {
          duration: 2000,
        });
      });
    });
  }

  delete(item) {
    this.deleteUser(item.id);
  }

}
