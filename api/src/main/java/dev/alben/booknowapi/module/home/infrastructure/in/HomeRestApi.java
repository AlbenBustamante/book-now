package dev.alben.booknowapi.module.home.infrastructure.in;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(path = "/home")
@RestController
public class HomeRestApi {
    private final HomeRestAdapter adapter;

    @GetMapping
    public ResponseEntity<HomeDto> getHome() {
        return ResponseEntity.ok(adapter.getHome());
    }
}
