import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipeitem',
  templateUrl: './recipeitem.component.html',
  styleUrls: ['./recipeitem.component.css']
})
export class RecipeitemComponent implements OnInit {
  @Input('recipedetail') recipe:Recipe;
  @Input('index') index:Number;
  //@Output('recipeitemclick') selectedElem = new EventEmitter<{ name: string, description: string, imageUrl: string }>();
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
  
}
