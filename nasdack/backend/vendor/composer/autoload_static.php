<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit4f0f90d2101f56454277c3ac887739f3
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit4f0f90d2101f56454277c3ac887739f3::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit4f0f90d2101f56454277c3ac887739f3::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit4f0f90d2101f56454277c3ac887739f3::$classMap;

        }, null, ClassLoader::class);
    }
}
