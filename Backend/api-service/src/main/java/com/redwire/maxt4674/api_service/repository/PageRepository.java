package com.redwire.maxt4674.api_service.repository;

import com.redwire.maxt4674.api_service.model.Page;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long> {
    Page findBySlug(String slug);

    List<Page> findByTitleContainingIgnoreCase(String search);
}
