import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({  name: 'chatMessage'})
export class ChatMessagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(message: string): any {
    const parts = message.split('&&');

    if (parts.length < 3) {
      return message;
    }
  const str = `${parts[0]}<span style=\'color:#bc272c; font-weight:bold\'>
          ${parts[1]}</span>${parts[2]}`;
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }

}
