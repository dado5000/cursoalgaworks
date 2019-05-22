package com.example.algamoneyapi.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.example.algamoneyapi.model.Pessoa;
import com.example.algamoneyapi.repository.PessoaRepository;

/*
 * Classe de serviço que pode ser injetada pelo spring
 * Regras de negócio
 * */

@Service
public class PessoaService {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	public Pessoa salvar(Pessoa pessoa) {
		pessoa.getContatos().forEach(c -> c.setPessoa(pessoa));
		return pessoaRepository.save(pessoa);
	}
	
	public Pessoa atualizar (Long codigo, Pessoa pessoa) {
		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
		
		pessoaSalva.getContatos().clear();
		pessoaSalva.getContatos().addAll(pessoa.getContatos());
		pessoa.getContatos().forEach(c -> c.setPessoa(pessoaSalva));		
		
		BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo", "contatos");//Copiando dados de pessoa para pessoaSalva menos o codigo
		return pessoaRepository.save(pessoaSalva);
	}
	

	public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
		pessoaSalva.setAtivo(ativo);
		pessoaRepository.save(pessoaSalva);		
	}
	
	public Pessoa buscarPessoaPeloCodigo(Long codigo) {
		Optional<Pessoa> pessoaSalva = pessoaRepository.findById(codigo);//Recebendo info de pessoa do banco
		if(!pessoaSalva.isPresent()) {
			throw new EmptyResultDataAccessException(1); 
		}
		return pessoaSalva.get();
	}
}
/* Aula 4.3 - 4.4 */
