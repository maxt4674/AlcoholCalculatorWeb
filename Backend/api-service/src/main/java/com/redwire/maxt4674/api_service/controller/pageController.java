package com.redwire.maxt4674.api_service.controller;

import com.redwire.maxt4674.api_service.model.Page;
import com.redwire.maxt4674.api_service.repository.PageRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pages")
public class pageController {

    private final PageRepository pageRepository;

    public pageController(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    @GetMapping
    public List<PageInfo> getPages(@RequestParam(required = false) String search) {
        List<Page> pages;
        
        if (search == null || search.isBlank()) {
            // If search is empty or null, return all pages
            pages = pageRepository.findAll();
        } else {
            // Otherwise, filter pages by title
            pages = pageRepository.findByTitleContainingIgnoreCase(search);
        }
    
        return pages.stream()
            .map(p -> new PageInfo(p.getSlug(), p.getTitle()))
            .toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PageContent> getPageContent(@PathVariable String slug) {
        Page page = pageRepository.findBySlug(slug);
        if (page == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if not found
        }
        return ResponseEntity.ok(new PageContent(slug, page.getTitle()));
    }

    @GetMapping("/check/{slug}")
    public ResponseEntity<String> checkSlugExists(@PathVariable String slug) {
        Page page = pageRepository.findBySlug(slug);
        if (page != null) {
            return ResponseEntity.status(400).body("Slug already exists");
        }
        return ResponseEntity.ok("Slug is available");
    }

    @PostMapping
    public ResponseEntity<Page> createPage(@RequestBody Page page) {
        Page savedPage = pageRepository.save(page);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPage);
    }

    public record PageInfo(String slug, String title) {}
    public record PageContent(String slug, String content) {}
}
