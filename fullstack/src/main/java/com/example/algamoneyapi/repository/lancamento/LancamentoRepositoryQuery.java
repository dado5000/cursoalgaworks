package com.example.algamoneyapi.repository.lancamento;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.algamoneyapi.dto.LancamentoEstatisticaCategoria;
import com.example.algamoneyapi.dto.LancamentoEstatisticaDia;
import com.example.algamoneyapi.model.Lancamento;
import com.example.algamoneyapi.repository.filter.LancamentoFilter;
import com.example.algamoneyapi.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {
	
	public List<LancamentoEstatisticaCategoria> porCategoria(LocalDate mesReferencia);
	public List<LancamentoEstatisticaDia> porDia(LocalDate mesReferencia);
	
	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);

}/* Aula 5.7 / 7.1 / 22.2*/
