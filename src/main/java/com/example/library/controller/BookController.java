package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    // GET
    @GetMapping
    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    // POST
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repo.save(book);
    }

    // PUT
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable int id,
                           @RequestBody Book updated) {

        Book book = repo.findById(id).orElseThrow();
        book.setName(updated.getName());
        book.setAuthor(updated.getAuthor());
        return repo.save(book);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable int id) {
        repo.deleteById(id);
    }
}
