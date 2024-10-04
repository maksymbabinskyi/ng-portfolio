import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "username",
})
export class UsernamePipe implements PipeTransform {
  transform(id: string, users: any[]): string {
    return users?.find((u) => u.id === id)?.name;
  }
}
