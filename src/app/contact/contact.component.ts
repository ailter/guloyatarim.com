import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
declare let alertify: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  content: string;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  redirectToInstagram() {
    window.open('https://instagram.com/guloyatarimas', '_blank');
  }

  async sendMessage() {
    if (!this.content) {
      alertify.alert('Güloya', 'Lütfen mesajınızı yazınız.');
      return;
    }

    let response = await this.messageService.send(this.content, this.name, this.email);

    if (!response) {
      alertify.alert('Güloya', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin');
    }

    if (response.success == 1) {
      alertify.alert('Güloya', 'Mesajınızı aldık. Teşekkürler!');
    }

    if (response.success == 0) {
      alertify.alert('Güloya', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin');
    }
  }

}
