import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from '../../assets/quest.json';

@Component({
  selector: 'app-carte-etudiant',
  templateUrl: './carte-etudiant.html',
  styleUrls: ['./carte-etudiant.css']
})
export class CarteEtudiant implements OnInit {
  etudiant: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.etudiant = (data as any[]).find(e => e.id === id);
  }
}
