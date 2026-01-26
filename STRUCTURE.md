# Cấu trúc thư mục đầy đủ - Cinema Web Project

```
cinema-web/
└── src/
    ├── App.tsx                    # Main app routing
    ├── App.css                    # App styles
    ├── main.tsx                   # Entry point
    ├── index.css                  # Global styles
    │
    ├── context/                   # Context API
    │   └── AuthContext.tsx        # Authentication context
    │
    ├── lib/                       # Library utilities
    │   └── utils.ts               # Utility functions
    │
    ├── types/                     # Global types
    │   └── fontsource.d.ts        # Font source type definitions
    │
    └── features/                  # Feature-based organization
        │
        ├── about/                 # About page
        │   ├── components/
        │   │   ├── AboutHero.tsx
        │   │   ├── AboutIntro.tsx
        │   │   ├── CinemaSystemSection.tsx
        │   │   ├── HeadquartersSection.tsx
        │   │   ├── MissionSection.tsx
        │   │   └── index.ts
        │   ├── constants/
        │   │   └── aboutData.ts
        │   ├── hooks/
        │   └── pages/
        │       └── AboutPage.tsx
        │
        ├── admin/                 # Admin pages
        │   ├── layout/
        │   │   ├── AdminLayout.tsx
        │   │   └── AdminSidebar.tsx
        │   │
        │   ├── bookings/          # Booking management
        │   │   ├── components/
        │   │   │   ├── BookingManagement.tsx
        │   │   │   ├── BookingRow.tsx
        │   │   │   ├── BookingsFilters.tsx
        │   │   │   ├── BookingsPagination.tsx
        │   │   │   ├── BookingsTable.tsx
        │   │   │   └── index.ts
        │   │   ├── hooks/
        │   │   │   ├── useBookings.ts
        │   │   │   ├── useCancelBooking.ts
        │   │   │   └── useConfirmBooking.ts
        │   │   └── pages/
        │   │       └── BookingManagementPage.tsx
        │   │
        │   ├── cinemas/           # Cinema management
        │   │   ├── components/
        │   │   │   └── index.ts
        │   │   ├── hooks/
        │   │   │   ├── index.ts
        │   │   │   └── useCinemas.ts
        │   │   └── pages/
        │   │       └── CinemaManagementPage.tsx
        │   │
        │   ├── movies/            # Movie management
        │   │   ├── components/
        │   │   │   ├── DeleteMovieModal.tsx
        │   │   │   ├── MovieFormModal.tsx
        │   │   │   ├── MovieManagement.tsx
        │   │   │   ├── MovieRow.tsx
        │   │   │   ├── MoviesFilters.tsx
        │   │   │   ├── MoviesPagination.tsx
        │   │   │   ├── MoviesTable.tsx
        │   │   │   └── index.ts
        │   │   ├── hooks/
        │   │   │   ├── useCreateMovie.ts
        │   │   │   ├── useDeleteMovie.ts
        │   │   │   ├── useMovies.ts
        │   │   │   └── useUpdateMovie.ts
        │   │   ├── pages/
        │   │   │   └── MovieManagementPage.tsx
        │   │   └── validation/
        │   │       └── movieSchema.ts
        │   │
        │   ├── rooms/             # Room management
        │   │   ├── components/
        │   │   │   ├── RoomFormModal.tsx
        │   │   │   ├── RoomManagement.tsx
        │   │   │   ├── RoomRow.tsx
        │   │   │   ├── RoomsFilter.tsx
        │   │   │   ├── RoomsPagination.tsx
        │   │   │   ├── RoomsTable.tsx
        │   │   │   └── index.ts
        │   │   ├── hooks/
        │   │   │   ├── index.ts
        │   │   │   ├── useRoomMutations.ts
        │   │   │   └── useRooms.ts
        │   │   └── pages/
        │   │       └── RoomManagementPage.tsx
        │   │
        │   ├── showtimes/         # Showtime management
        │   │   ├── components/
        │   │   │   ├── ShowtimeFormModal.tsx
        │   │   │   ├── ShowtimeManagement.tsx
        │   │   │   ├── ShowtimeRow.tsx
        │   │   │   ├── ShowtimesPagination.tsx
        │   │   │   ├── ShowtimesTable.tsx
        │   │   │   └── index.ts
        │   │   ├── hooks/
        │   │   │   ├── index.ts
        │   │   │   ├── useShowtimeMutations.ts
        │   │   │   └── useShowtimes.ts
        │   │   └── pages/
        │   │       └── ShowtimeManagementPage.tsx
        │   │
        │   └── users/             # User management
        │       ├── components/
        │       │   ├── UserFormModal.tsx
        │       │   ├── UserManagement.tsx
        │       │   ├── UserRow.tsx
        │       │   ├── UsersPagination.tsx
        │       │   ├── UsersTable.tsx
        │       │   └── index.ts
        │       ├── hooks/
        │       │   ├── index.ts
        │       │   ├── useUserMutations.ts
        │       │   └── useUsers.ts
        │       └── pages/
        │           └── UserManagementPage.tsx
        │
        ├── auth/                  # Authentication
        │   ├── components/
        │   │   ├── AuthIcons.tsx
        │   │   ├── ErrorMessage.tsx
        │   │   ├── FormField.tsx
        │   │   ├── InputField.tsx
        │   │   ├── SuccessMessage.tsx
        │   │   └── index.ts
        │   ├── hooks/
        │   │   ├── index.ts
        │   │   ├── useLogin.ts
        │   │   └── useRegister.ts
        │   ├── pages/
        │   │   ├── LoginPage.tsx
        │   │   └── RegisterPage.tsx
        │   └── validation/
        │       └── authSchema.ts
        │
        ├── booking/               # Booking flow (4 steps)
        │   ├── components/
        │   │   ├── Booking.tsx
        │   │   ├── BookingHeader.tsx
        │   │   ├── BookingStepper.tsx
        │   │   ├── BookingSummary.tsx
        │   │   ├── RefreshmentSelector.tsx
        │   │   ├── SeatSelector.tsx
        │   │   ├── ShowtimeSelector.tsx
        │   │   └── index.ts
        │   ├── hooks/
        │   │   ├── index.ts
        │   │   ├── useBookedSeats.ts
        │   │   ├── useBookingMutation.ts
        │   │   ├── useRefreshments.ts
        │   │   ├── useSeats.ts
        │   │   └── useShowtime.ts
        │   └── pages/
        │       └── BookingPage.tsx
        │
        ├── home/                  # Homepage
        │   ├── components/
        │   │   ├── ContactSection.tsx
        │   │   ├── HeroBanner.tsx
        │   │   ├── HomeSection.tsx
        │   │   ├── MobileAppBanner.tsx
        │   │   ├── MovieCard.tsx
        │   │   ├── MovieSlider.tsx
        │   │   ├── PromotionsSection.tsx
        │   │   └── QuickBooking.tsx
        │   ├── hooks/
        │   │   ├── index.ts
        │   │   └── useQuickBooking.ts
        │   └── pages/
        │       └── HomePage.tsx
        │
        ├── movies/                # Movies pages (List, Detail)
        │   ├── components/
        │   │   ├── Breadcrumb.tsx
        │   │   ├── CastSection.tsx
        │   │   ├── MovieDetail.tsx
        │   │   ├── MovieHero.tsx
        │   │   ├── MovieInfo.tsx
        │   │   ├── MoviesFilter.tsx
        │   │   ├── MoviesGrid.tsx
        │   │   ├── ReviewsSection.tsx
        │   │   ├── ShowtimesSection.tsx
        │   │   ├── SimilarMovies.tsx
        │   │   ├── TrailerModal.tsx
        │   │   └── index.ts
        │   ├── hooks/
        │   │   ├── useMovieDetail.ts
        │   │   ├── useMovies.ts
        │   │   └── useShowtimesByMovie.ts
        │   └── pages/
        │       ├── MovieDetailPage.tsx
        │       └── MoviesPage.tsx
        │
        └── profile/               # Profile, Booking History
            ├── components/
            │   ├── PasswordChangeForm.tsx
            │   ├── Profile.tsx
            │   ├── ProfileAvatar.tsx
            │   ├── ProfileContent.tsx
            │   ├── ProfileEditForm.tsx
            │   ├── ProfileInfoCard.tsx
            │   ├── ProfileSidebar.tsx
            │   └── index.ts
            ├── hooks/
            │   ├── index.ts
            │   ├── useBookingHistory.ts
            │   └── useProfile.ts
            └── pages/
                ├── BookingHistoryPage.tsx
                └── ProfilePage.tsx
    │
    └── shared/                    # Shared code
        ├── api/                   # API clients
        │   ├── api-client.ts      # Axios instance
        │   ├── auth.api.ts
        │   ├── bookings.api.ts
        │   ├── cinemas.api.ts
        │   ├── movies.api.ts
        │   ├── profile.api.ts
        │   ├── query-client.ts    # React Query client
        │   ├── refreshments.api.ts
        │   ├── rooms.api.ts
        │   ├── showtimes.api.ts
        │   ├── users.api.ts
        │   └── index.ts
        │
        ├── components/            # Reusable components
        │   ├── ConfirmModal.tsx
        │   ├── Footer.tsx
        │   ├── MovieTicketCard.tsx
        │   ├── ProtectedRoute.tsx
        │   │
        │   ├── header/            # Header components
        │   │   ├── GlobalSearch.tsx
        │   │   ├── NewHeader.tsx
        │   │   └── index.ts
        │   │
        │   ├── layout/            # Layout components
        │   │   ├── Header.tsx
        │   │   ├── Layout.tsx
        │   │   └── index.ts
        │   │
        │   └── ui/                # UI components
        │       ├── Button.tsx
        │       ├── Card.tsx
        │       ├── Checkbox.tsx
        │       ├── Input.tsx
        │       ├── Label.tsx
        │       ├── Select.tsx
        │       ├── Textarea.tsx
        │       └── index.ts
        │
        ├── constants/             # Constants
        │   ├── api.ts             # API endpoints
        │   └── routes.ts          # Route paths
        │
        ├── hooks/                 # Custom hooks
        │   ├── useDebounce.ts
        │   └── useScrollToTop.ts
        │
        ├── pages/                 # Shared pages
        │   ├── NotFound.tsx
        │   └── ServerError.tsx
        │
        ├── types/                 # TypeScript types/interfaces
        │   ├── api.types.ts
        │   ├── auth.types.ts
        │   ├── booking.types.ts
        │   ├── cinema.types.ts
        │   ├── movie.types.ts
        │   ├── profile.types.ts
        │   ├── refreshment.types.ts
        │   ├── room.types.ts
        │   ├── seat.types.ts
        │   ├── showtime.types.ts
        │   └── user.types.ts
        │
        └── utils/                 # Utility functions
            ├── format.ts          # Formatting utilities
            ├── jwt.ts             # JWT utilities
            └── validation.ts      # Validation utilities
```

## Tổng số file

- **Features**: ~150+ files
- **Shared**: ~40+ files
- **Root**: 5 files
- **Tổng cộng**: ~195+ files

## Cấu trúc theo feature

Mỗi feature có cấu trúc chuẩn:
```
feature-name/
├── components/     # UI components
├── hooks/          # Custom hooks
├── pages/          # Page components
├── constants/      # Feature constants (nếu có)
└── validation/     # Validation schemas (nếu có)
```

## Cấu trúc shared

```
shared/
├── api/            # API clients
├── components/     # Reusable components
├── constants/      # App constants
├── hooks/          # Shared hooks
├── pages/          # Shared pages
├── types/          # TypeScript types
└── utils/          # Utility functions
```


