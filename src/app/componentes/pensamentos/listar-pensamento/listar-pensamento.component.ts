import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listarPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  maisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural'

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listar) => {
      this.listarPensamentos = listar
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listarMais => {
      this.listarPensamentos.push(...listarMais);
      if(!listarMais.length){
        this.maisPensamentos = false
      }
    })
  }

  pesquisarPensamentos() {
    this.maisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos => {
      this.listarPensamentos = listaPensamentos
    })
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos'
    this.favoritos = true;
    this.maisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(pensamentosFavoritos => {
      this.listarPensamentos = pensamentosFavoritos
      this.listaFavoritos = pensamentosFavoritos
    })
    }

  recarregarComponente(){
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url])
    }
  }
