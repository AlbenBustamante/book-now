package dev.alben.booknowapi.module.home.infrastructure.in;

import dev.alben.booknowapi.core.common.RestAdapter;
import dev.alben.booknowapi.module.home.application.port.in.GetHomeUseCase;
import lombok.RequiredArgsConstructor;

@RestAdapter
@RequiredArgsConstructor
public class HomeRestAdapter {
    private final HomeDtoMapper mapper;
    private final GetHomeUseCase getHomeUseCase;

    public HomeDto getHome() {
        return mapper.toDto(getHomeUseCase.getHome());
    }
}
