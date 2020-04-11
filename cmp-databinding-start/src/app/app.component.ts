import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];
  newServerName = '';
  newServerContent = '';

  onAddServer(server) {
    this.serverElements.push({
      type: server.type,
      name: server.name,
      content: server.content
    });
  }

  onAddBlueprint(server) {
    this.serverElements.push({
      type: server.type,
      name: server.name,
      content: server.content
    });
  }
}
