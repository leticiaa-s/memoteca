import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listarPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  maisPensamentos: boolean = true;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listar) => {
      this.listarPensamentos = listar
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual).subscribe(listarMais => {
      this.listarPensamentos.push(...listarMais);
      if(!listarMais.length){
        this.maisPensamentos = false
      }
    })
  }

}
