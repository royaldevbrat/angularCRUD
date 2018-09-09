import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../comment-service.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  allComments: any = [];
  name: any;
  desc: any;
  constructor(public commentService: CommentServiceService) {
    this.commentService.getComments().subscribe((data: any) => {
      this.allComments = data.comments;
    });
  }

  ngOnInit() {
  }

  addComment(node) {
    const commentData = {
      name: this.name,
      description: this.desc,
      patentNode: node
    };
    this.commentService.addComment(commentData).subscribe((data: any) => {
      if (data.success) {
        alert('Added Successfully!');
        this.allComments.push(commentData);
        this.name = '';
        this.desc = '';
      } else {
        alert('Falied to add!');
      }
    });
  }
  deleteComment(id) {
    this.commentService.deleteComment(id).subscribe((data: any) => {
      if (data.success) {
        alert('Removed Successfully!');
        this.allComments = this.allComments.filter(el => el._id !== id);
      } else {
        alert('Falied to delete!');
      }
    });
  }

}
